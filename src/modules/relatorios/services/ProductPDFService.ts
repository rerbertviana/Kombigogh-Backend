import { Request, Response } from "express";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { getCustomRepository } from "typeorm";
import ProductsRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import ListProductService from "@modules/products/services/ListProductService";




export default class ProductPDFService {


    public async pdf(request: Request, response: Response): Promise<void> {

        const listProducts = new ListProductService();

        const products = await listProducts.execute();

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


        for await (let product of products) {
            const rows = new Array();
            rows.push(product.id);
            rows.push(product.nome);
            rows.push(product.descricao);
            rows.push(`R$ ${product.preco}`);
            rows.push(product.quantidade);

            body.push(rows);
        }





        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica" },

            pageSize: 'A4',

            footer: function (currentPage, pageCount) {
                return [
                    { text: currentPage.toString() + ' de ' + pageCount, style: "foot"}   
                ]
            },
            header: function (currentPage, pageCount, pageSize) {
                // you can apply any logic and return any valid pdfmake element

                return [
                    { text: '\nsimple text', alignment: (currentPage % 2) ? 'left' : 'right', style: "head" },
                    { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
                ]
            },
            
            content: [

                { text: "Relatório de Produtos\n\n", style: "header" },
                
                {
                    table: {
                        heights: function (row) {
                            return 20;
                        },
                        body: [
                            
                            [
                                { text: "ID", style: "columnsTitle" },
                                { text: "Nome", style: "columnsTitle" },
                                { text: "Descrição", style: "columnsTitle" },
                                { text: "Preço", style: "columnsTitle" },
                                { text: "Quantidade", style: "columnsTitle" },
                            ],
                            ...body,
                        ]
                    },
                },
                { text: "\n\nData", style: "foot"},
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center"
                },
                columnsTitle: {
                    fontSize: 15,
                    bold: true,
                    fillColor: "#82D4D1",
                    color: "#FFF",
                    alignment: "center"
                },
                foot: {
                    alignment: "right",
                    margin: 15,
                },
                head: {
                    margin: 15,
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