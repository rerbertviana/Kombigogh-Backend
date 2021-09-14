import { Request, Response } from "express";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import ListProductUserService from "@modules/users/services/ListProductUserService";


export default class ListProductsUserPDFService {


    public async pdf(request: Request, response: Response): Promise<void> {

        const { user_id } = request.params;

        // listar produtos por usuario
        const listproducts = new ListProductUserService();
        const listproductsUser = await listproducts.execute({ user_id });

        // pegar o nome do artista
        const nomeArtista = listproductsUser?.nome;

        // setar apenas o array de produtos 
        const products = listproductsUser?.product;

        //verificar tamanho do array
        const productsLength = products?.length;
        
        // procedimentos para pegar o valor total dos produtos
        const totalProduct = products?.map(product => product.preco * product.quantidade);

        let total = 0;

        if (totalProduct) {
            for (let i = 0; i < totalProduct.length; i++) {
                total = total + totalProduct[i];
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

        const body: any[] = [];


        if (products) {
            for await (let product of products) {
                const rows = new Array();
                rows.push(product.nome);
                rows.push(product.descricao);
                rows.push(`R$ ${product.preco}`);
                rows.push(product.quantidade);

                body.push(rows);
            }
        }
     

        // Obtém a data/hora atual
        var data = new Date();

        // Guarda cada pedaço em uma variável
        var dia = data.getDate();           // 1-31
        var dia_sem = data.getDay();            // 0-6 (zero=domingo)
        var mes = data.getMonth();          // 0-11 (zero=janeiro)
        var ano4 = data.getFullYear();       // 4 dígitos
        var hora = data.getHours();          // 0-23
        var min = data.getMinutes();        // 0-59
        var seg = data.getSeconds();        // 0-59
        var mseg = data.getMilliseconds();   // 0-999
        var tz = data.getTimezoneOffset(); // em minutos

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

                { text: '\nRELATÓRIO DE PRODUTOS\n', style:"header" },
                { text: `Artista: ${nomeArtista} \n\n`, style: "sub" },

                {
                    table: {

                        heights: function (row) {
                            return 20;
                        },

                        widths: ['*', 200, 125, '*'],

                        body: [

                            [
                                { text: "Nome", style: "columnsTitle" },
                                { text: "Descrição", style: "columnsTitle" },
                                { text: "Preço", style: "columnsTitle" },
                                { text: "Quantidade", style: "columnsTitle" },
                            ],
                            ...body,
                        ]
                    },
                },
                { text: `\nTOTAL: R$ ${total}. `, style: "total" },
                { text: `\n${productsLength} registro(s) encontrado(s).` }
            ],
            styles: {
                sub: {
                    fontSize: 15,
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