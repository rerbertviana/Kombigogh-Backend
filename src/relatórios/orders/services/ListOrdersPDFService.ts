import { Request, Response } from "express";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import ListUserService from "@modules/users/services/ListUserService";
import ListOrderService from "@modules/orders/services/ListOrderService";



export default class ListOrdersPDFService {


    public async pdf(request: Request, response: Response): Promise<void> {

        const listOrders = new ListOrderService();

        const orders = await listOrders.execute();

        const ordersLength = orders.length;

        const totalOrders = orders.map(order => order.total);

        let total = 0;

        for (let i = 0; i < totalOrders.length; i++) {
            total = total + totalOrders[i];
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


        for await (let order of orders) {
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

                { text: "\nRELATÓRIO DE PEDIDOS\n\n", style: "header" },

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
                { text: `\n${ordersLength} registro(s) encontrados.` },
            ],
            styles: {
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