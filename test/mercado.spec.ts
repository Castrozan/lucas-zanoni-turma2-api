import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';
import data from '../data/data.json';

describe('Mercado API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const mercadoSchema = {
    "cnpj": /.*/,
    "endereco": /.*/,
    "id": /.*/,
    "nome": /.*/,
  };
  var mercado;
  var mercadoId;

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());
  beforeEach(() => {
    console.log('Mercado id: ', mercadoId);
  });

  describe('Verifying endpoints /mercado', () => {
    const path = '/mercado';

    it('Get valid mercado id', async () => {
      mercado = await p
        .spec()
        .get(`${baseUrl}${path}`)
        .expectStatus(StatusCodes.OK)
        .returns(returned =>
          returned.res.body.find(item =>
            item.id &&
            item.cnpj &&
            item.endereco
          )
        );

      if (!mercado) {
        throw new Error('No valid mercado found');
      }

      mercadoId = mercado.id;
    });

    it('GET mercado should list of itens', async () => {
      await p
        .spec()
        .get(`${baseUrl}${path}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([
          {},
          {}
        ]);
    });

    it('GET mercado should return a least 1 mercado', async () => {
      await p
        .spec()
        .get(`${baseUrl}${path}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([
          mercadoSchema
        ]);
    });
  });

  describe('Verifying endpoints /mercado/{mercadoId}', () => {
    const path = '/mercado';

    // it('GET mercado 1 should return ok', async () => {
    //   await p
    //     .spec()
    //     .get(`${baseUrl}${path}/${mercadoId}`)
    //     .expectStatus(StatusCodes.OK)
    //     .expectJsonLike([
    //       mercadoSchema
    //     ]);
    // });

    it('PUT mercado 1 should return ok', async () => {
      await p
        .spec()
        .get(`${baseUrl}${path}/${mercadoId}`)
        .expectStatus(StatusCodes.OK)
        .withJson(
          {
            "cnpj": "12345678901234",
            "endereco": "Rua do zanoni",
            "nome": "Mercado do zanoni"
          }
        );
    });

    // COMENTAR O DELETE PARA GLR NÂO FICAR SEM MERCADO
    // it('DELETE mercado 1 should return ok', async () => {
    //   await p
    //     .spec()
    //     .get(`${baseUrl}${path}/${mercadoId}`)
    //     .expectStatus(StatusCodes.OK);
    // });
  });

  describe('Verifying endpoints /mercado/{mercadoId}/produtos', () => {
    const path = '/mercado';
    var mercadoProdutos;
    var mercadoProdutosId;

    it('Get valid mercado id', async () => {
      mercadoProdutos = await p
        .spec()
        .get(`${baseUrl}${path}`)
        .expectStatus(StatusCodes.OK)
        .returns(returned =>
          returned.res.body.find(item =>
            item.id &&
            item.cnpj &&
            item.endereco &&
            item.produtos
          )
        );

      if (!mercadoProdutos) {
        throw new Error('No valid mercado found');
      }

      mercadoProdutosId = mercadoProdutos.id;
    });

    it('GET mercado produtos should return list of produtos', async () => {
      console.log('Mercado produtos id: ', mercadoProdutosId);

      await p
        .spec()
        .get(`${baseUrl}${path}/${mercadoProdutosId}/produtos`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({});
    });
  });
});

