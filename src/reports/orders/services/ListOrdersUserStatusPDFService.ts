import { Request, Response } from "express";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import ListOrderUserService from "@modules/users/services/ListOrderUserService";



export default class ListOrdersUserStatusPDFService {


    public async pdf(request: Request, response: Response): Promise<void> {

        const { user_id, status } = request.params;


        // pegando pedidos pelo usuario
        const listOrders = new ListOrderUserService();
        const orders = await listOrders.execute({ user_id });

        // pegando o nome do usuario
        const userName = orders?.nome;

        // setando apenas os pedidos sem os dados do usuario
        const ordersUser = orders?.order;

        // filtrar orders pelo status recebido

        let ordersStatus: any[] = [];

        if (ordersUser) {
            ordersStatus = ordersUser.filter(order => order.status === status);
        }


        const totalOrders = ordersStatus.map(order => order.total);

        let total = 0;

        if (totalOrders) {

            for (let i = 0; i < totalOrders.length; i++) {
                total = total + totalOrders[i];
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


        if (ordersStatus)
            for await (let order of ordersStatus) {
                const rows = new Array();
                rows.push(order.id);
                rows.push(order.cliente);
                rows.push(order.status);
                rows.push(`R$ ${order.total}`);

                body.push(rows);
            }

        // Obtém a data/hora atual
        var data = new Date();

        // Guarda cada pedaço em uma variável
       var dia = data.getDate();           // 1-31
       //var dia_sem = data.getDay();            // 0-6 (zero=domingo)
       var mes = data.getMonth();          // 0-11 (zero=janeiro)
       var ano4 = data.getFullYear();       // 4 dígitos
       var hora = data.getHours();          // 0-23
       var min = data.getMinutes();        // 0-59
       //var seg = data.getSeconds();        // 0-59
       //var mseg = data.getMilliseconds();   // 0-999
       //var tz = data.getTimezoneOffset(); // em minutos

       // Formatar a data 
       if (dia < 10 && mes <= 8) {
           var str_data = "0" + dia + '/' + "0" + (mes + 1) + '/' + ano4;
       }
       if (dia < 10 && mes >= 9) {
           var str_data = "0" + dia + '/' + (mes + 1) + '/' + ano4;
       }
       if (dia >=10 && mes <= 8) {
           var str_data = dia + '/' + "0" + (mes + 1) + '/' + ano4;
       }
       if (dia >= 10 && mes >= 9) {
           var str_data = dia + '/' + (mes + 1) + '/' + ano4;
       }

       //formatar hora
       if (hora < 10 && min < 10) {
           var str_hora = "0" + hora + ':' + "0" + min;
       }
       if (hora < 10 && min >= 10) {
           var str_hora = "0" + hora + ':' + min;
       }
       if (hora >= 10 && min < 10) {
           var str_hora = hora + ':' + "0" + min;
       }
       if (hora >= 10 && min >= 10) {
           var str_hora = hora + ':' + min;
       }


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

                { text: '\nRELATÓRIO DE PEDIDOS\n', style: "header" },
                { text: `\nVENDEDOR: ${userName}\n\n`, style: "sub" },
                { text: `\nSTATUS: ${status}\n\n`, style: "sub2" },

                {
                    table: {

                        heights: function (row) {
                            return 20;
                        },

                        widths: [250, '*', '*', '*'],

                        body: [

                            [
                                { text: "ID", style: "columnsTitle" },
                                { text: "Cliente", style: "columnsTitle" },
                                { text: "Status", style: "columnsTitle" },
                                { text: "Total", style: "columnsTitle" },
                            ],
                            ...body,
                        ]
                    },
                },
                { text: `\nTOTAL: R$ ${total}. `, style: "total" },
                { text: `\n${ordersStatus.length} registro(s) encontrado(s).` },
            ],
            styles: {
                sub: {
                    fontSize: 15,
                    alignment: "center",
                },
                sub2: {
                    fontSize: 12
                },
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 15,
                    bold: true,
                    fillColor: "#69F690",
                    color: "#FFF",
                    alignment: "left",
                    margin: [0, 3, 0, 0]
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