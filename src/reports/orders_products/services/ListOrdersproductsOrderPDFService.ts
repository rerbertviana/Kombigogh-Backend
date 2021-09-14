import { Request, Response, Router } from 'express';
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import ListProductService from '@modules/products/services/ListProductService';
import ListUserService from '@modules/users/services/ListUserService';

export default class ListOrdersproductsOrderPDFService {

    public async pdf(request: Request, response: Response): Promise<void> {

        const { order_id } = request.params;
        const id = order_id;

        // listar o pedido especifico
        const showorder = new ShowOrderService();
        const order = await showorder.execute({ id });

        // setar apenas order_products do pedido
        const ordersproducts = order.order_products;

        //listar todos os produtos
        const listproducts = new ListProductService();
        const products = await listproducts.execute();

        //listar todos os usuarios
        const listusers = new ListUserService();
        const users = await listusers.execute();

        // setar array resul 

        // for para varrer todos os ordersproducts dentro de ordersproducts

        const resul = ordersproducts.map(order => ({
            artista: users.filter(u => u.id === (products.filter(p => p.id === order.product_id)[0].user_id))[0].nome,
            produto: products.filter(p => p.id === order.product_id)[0].nome,
            preco: order.preco,
            quantidade: order.quantidade
        }));



        const body: any[] = [];
            
        
        for await (let product of resul) {
            const rows = new Array();

            rows.push(product.artista);
            rows.push(product.produto);
            rows.push(product.preco);
            rows.push(product.quantidade);

            body.push(rows);
        }

        // procedimentos para conversão PDF

        var fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            },
        };

        const printer = new PDFPrinter(fonts);


        // Obtém a data/hora atual
        var data = new Date();

        // Guarda cada pedaço em uma variável
        var dia = data.getDate();           // 1-31
        var mes = data.getMonth();          // 0-11 (zero=janeiro)
        var ano4 = data.getFullYear();       // 4 dígitos
        var hora = data.getHours();          // 0-23
        var min = data.getMinutes();        // 0-59
        var seg = data.getSeconds();        // 0-59

        // Formata a data e a hora (note o mês + 1)
        if (dia < 10 && mes < 10) {
            var str_data = "0" + dia + '/' + "0" + (mes + 1) + '/' + ano4;
        }
        else {
            if (dia < 10)
                var str_data = "0" + dia + '/' + (mes + 1) + '/' + ano4;

            else (mes > 10)
            var str_data = dia + '/' + "0" + (mes + 1) + '/' + ano4;

        }

        var str_hora = hora + ':' + min + ':' + seg;


        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica" },

            pageSize: 'A4',

            footer: function (currentPage, pageCount) {
                return [
                    { text: currentPage.toString() + ' de ' + pageCount, style: "foot" }
                ]
            },
            header: function (currentPage, pageCount, pageSize) {
                // you can apply any logic and return any valid pdfmake element

                return [
                    { text: '\nData:' + ` ${str_data} as ${str_hora}`, alignment: (currentPage % 2) ? 'left' : 'right', style: "head" },
                    { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
                ]
            },

            content: [

                { text: "RELATÓRIO DE VENDAS\n\n", style: "header" },
                { text: `ID - Pedido: ${id}\n\n`, style: "sub" },
                {
                    table: {

                        heights: function (row) {
                            return 20;
                        },

                        widths: ['*', '*', '*', '*'],

                        body: [

                            [
                                { text: "Artista", style: "columnsTitle" },
                                { text: "Produto", style: "columnsTitle" },
                                { text: "Preço", style: "columnsTitle" },
                                { text: "Quantidade", style: "columnsTitle" },
                            ],
                            ...body,
                        ]
                    },
                },
                { text: `\nTOTAL: R$ ${order.total}. `, style: "total" },
                { text: `\n${resul.length} registro(s) encontrado(s).` }
            ],
            styles: {
                sub: {
                    fontSize: 12,
                    alignment: "center",
                },
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 15,
                    bold: true,
                    fillColor: "#82D4D1",
                    color: "#FFF",
                    alignment: "left",
                },
                foot: {
                    alignment: "right",
                    margin: 15,
                },
                head: {
                    margin: 15,
                },
                total: {
                    bold: true,
                }
            }
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        const chunks: any[] = [];


        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });
        pdfDoc.end();

        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks)
            response.end(result);

        })

    }

}