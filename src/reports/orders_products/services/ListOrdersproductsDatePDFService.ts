import { Request, Response, Router } from 'express';
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import ListOrderService from '@modules/orders/services/ListOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import ListProductService from '@modules/products/services/ListProductService';
import { getMonth, getYear } from 'date-fns';
import ListUserService from '@modules/users/services/ListUserService';

export default class ListOrdersproductsDatePDFService {

    public async pdf(request: Request, response: Response): Promise<void> {

        const { mes, ano } = request.params;

        // converter os valores recebidos em inteiros
        const orderMes = parseInt(mes);
        const orderAno = parseInt(ano);

        // apresentar o mês no relatório
        var mesPDF = "";

        switch (orderMes) {
            case 0:
                mesPDF = "Janeiro";
                break;
            case 1:
                mesPDF = "Fevereiro";
                break;
            case 2:
                mesPDF = "Março";
                break;
            case 3:
                mesPDF = "Abril";
                break;
            case 4:
                mesPDF = "Maio";
                break;
            case 5:
                mesPDF = "Junho";
                break;
            case 6:
                mesPDF = "Julho";
                break;
            case 7:
                mesPDF = "Agosto";
                break;
            case 8:
                mesPDF = "Setembro";
                break;
            case 9:
                mesPDF = "Outubro";
                break;
            case 10:
                mesPDF = "Novembro";
                break;
            case 11:
                mesPDF = "Dezembro";
                break;
        }

        // listar todos os pedidos

        const listorders = new ListOrderService();

        const orders = await listorders.execute();

        // filtrar os pedidos pela datas
        const ordersData = orders.filter(order => getMonth(order.created_at) === orderMes && getYear(order.created_at) === orderAno);


        // setar um array contendo o valor total de cada pedido
        const totalOrders = ordersData.map(order => order.total);

       
        // pegar o valor total de todos os pedidos
        let total = 0;

        for (let i = 0; i < totalOrders.length; i++) {
            total = total + totalOrders[i];
        }

        // exibir o conteudo dos pedidos
        const showOrders = new ShowOrderService();

        const ordersproducts: any[] = [];

        // setar apenas os ids dos pedidos
        const ordersids = ordersData.map(order => order.id)

        // pegar apenas os orders products de todos os pedidos
        for (let i = 0; i < ordersids.length; i++) {

            let id = ordersids[i];
            let teste = await showOrders.execute({ id });
            ordersproducts.push(teste.order_products);
        }

         //listar todos os produtos
        const listproducts = new ListProductService();
        const products = await listproducts.execute();

        //listar todos os usuarios
        const listusers = new ListUserService();
        const users = await listusers.execute();

        const resul: any[] = [];

        // setar array resul 

        // for para varrer todos os array de ordersproducts dentro de ordersproducts
        for (let i = 0; i < ordersproducts.length; i++) {
            resul.push(
                ordersproducts.map(order => ({
                    order_id: order[i].order_id,
                    artista: users.filter(u => u.id === (products.filter(p => p.id === order[i].product_id)[0].user_id))[0].nome,
                    produto: products.filter(p => p.id === order[i].product_id)[0].nome,
                    preco: order[i].preco,
                    quantidade: order[i].quantidade
                }))
            )
        }

        const body: any[] = [];

        // for para setar body com todos os valores contidos no array resul

        for (let i = 0; i < resul.length; i++) {

            for await (let product of resul[i]) {
                const rows = new Array();
                rows.push(product.order_id);
                rows.push(product.artista)
                rows.push(product.produto);
                rows.push(product.preco);
                rows.push(product.quantidade);

                body.push(rows);
            }
        }


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
        var dia_sem = data.getDay();            // 0-6 (zero=domingo)
        var mesData = data.getMonth();          // 0-11 (zero=janeiro)
        var ano4 = data.getFullYear();       // 4 dígitos
        var hora = data.getHours();          // 0-23
        var min = data.getMinutes();        // 0-59
        var seg = data.getSeconds();        // 0-59
        var mseg = data.getMilliseconds();   // 0-999
        var tz = data.getTimezoneOffset(); // em minutos

        // Formata a data e a hora (note o mês + 1)
        if (dia < 10 && mesData < 10) {
            var str_data = "0" + dia + '/' + "0" + (mesData + 1) + '/' + ano4;
        }
        else {
            if (dia < 10)
                var str_data = "0" + dia + '/' + (mesData + 1) + '/' + ano4;

            else (mesData > 10)
            var str_data = dia + '/' + "0" + (mesData + 1) + '/' + ano4;

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
                { text: `Mês: ${mesPDF} - Ano: ${orderAno}\n\n`, style: "sub" },

                {
                    table: {

                        heights: function (row) {
                            return 20;
                        },

                        widths: [230, 60, 70, 45, 85],

                        body: [

                            [
                                { text: "ID_Pedido", style: "columnsTitle" },
                                { text: "Artista", style: "columnsTitle" },
                                { text: "Produto", style: "columnsTitle" },
                                { text: "Preço", style: "columnsTitle" },
                                { text: "Quantidade", style: "columnsTitle" },
                            ],
                            ...body,
                        ]
                    },
                },
                { text: `\nTOTAL: R$ ${total}. `, style: "total" },
                { text: `\n${body.length} registro(s) encontrado(s).` }
            ],
            styles: {
                sub: {
                    fontSize: 12,
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