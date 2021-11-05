import { Request, Response, Router } from 'express';
import ListProductUserService from '@modules/users/services/ListProductUserService';
import OrdersRepository from '@modules/orders/typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export default class ListOrdersproductsUserPDFService {

    public async pdf(request: Request, response: Response): Promise<void> {

        const { user_id } = request.params;

        const listproducts = new ListProductUserService();
        const ordersRepository = getCustomRepository(OrdersRepository);

        // Gerar todos os pedidos 
        const orders = await ordersRepository.find();

        // Listar todos os produtos por id do usuário com os dados do usuario.
        const listproductsUser = await listproducts.execute({ user_id });

        // Ver nome do usuário
        const nomeUser = await listproductsUser?.nome;

        // Setar apenas produtos do usuario sem os dados do usuario
        const products = listproductsUser?.product;

        // Uma lista com apenas os ids dos produtos 
        const productsIds = products?.map(product => product.id);

        // Setar array com qualquer tipagem.
        const productsSale: any[] = [];

        // Uma lista com apenas os ids dos pedidos
        const ordersIds = orders.map(order => order.id)

        // Laço para verificar quais produtos do usuario batem com os pedidos
        for (let i = 0; i < orders.length; i++) {

            // Selecionando o pedido especifico do array de pedidos 
            const order = await ordersRepository.findById(ordersIds[i]);
            // Setar a tabela pivô em order2
            const order2 = order?.order_products;

            // Condição de existência
            if (order2 && productsIds) {
                // for para varrer todos os ids dos produtos existentes em pedidos
                for (let y = 0; y < order2?.length; y++) {
                    // for para varrer todos ids dos produtos do usuario
                    for (let z = 0; z < productsIds.length; z++) {
                        // condição para comparar o id dos produtos dos pedidos com o id dos produtos do usuário
                        if (order2[y].product_id === productsIds[z]) {
                            // criando um array que vai conter os dados que batem com a condição
                            productsSale.push({
                                producteste: order2[y].product_id,
                                quanti: order2[y].quantidade,
                                orderId: order2[y].order_id,
                                orderPreco: order2[y].preco
                            });
                        }
                    }
                }
            }
        }

        // processo abaixo vai ser feito para pegar o nome do produto

        // pegando um repositório de produtos
        const productsRepository = getCustomRepository(ProductsRepository);

        // criando um array apenas com os ids dos produtos que foram vendidos
        const productsSaleId = productsSale.map(product => product.producteste)

        const p: any[] = [];

        //laço para pegar os produtos vendidos 
        for (let k = 0; k < productsSale.length; k++) {
            p.push(await productsRepository.findById(productsSaleId[k]));
        }

        // criar um objeto que contenha os dados para ser apresentados no relatório
        const resul = productsSale.map(product => ({
            pedido: product.orderId,
            id: product.producteste,
            nome: p.filter(p => p.id === product.producteste)[0].nome,
            quantidade: product.quanti,
        }));

        const totalProduct = productsSale.map(product => product.orderPreco * product.quanti);

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


        if (resul) {
            for await (let product of resul) {
                const rows = new Array();
                rows.push(product.pedido);
                rows.push(product.nome);
                rows.push(product.quantidade);

                body.push(rows);
            }
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

                { text: '\nRELATÓRIO DE VENDAS', style: "header" },
                { text: `\nARTISTA: ${nomeUser}\n\n`, style: "sub" },

                {
                    table: {

                        heights: function (row) {
                            return 20;
                        },

                        widths: [250, '*', '*'],

                        body: [

                            [
                                { text: "ID - Pedido", style: "columnsTitle" },
                                { text: "Nome", style: "columnsTitle" },
                                { text: "Quantidade", style: "columnsTitle" },
                            ],
                            ...body,
                        ]
                    },
                },
                { text: `\nTOTAL: R$ ${total}. `, style: "total" },
                { text: `\n${resul.length} registro(s) encontrado(s).` }
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