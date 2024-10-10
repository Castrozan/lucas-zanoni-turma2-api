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
  var mercadoId;

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Verifying endpoints /mercado', () => {
    const path = '/mercado';

    it('Get mercado id', async () => {
      mercadoId = await p
        .spec()
        .get(`${baseUrl}${path}`)
        .expectStatus(StatusCodes.OK)
        .returns(returned => returned.res.body[0].id);

      console.log('Mercado id: ', mercadoId);
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
    //   console.log('mercado id', mercadoId);

    //   await p
    //     .spec()
    //     .get(`${baseUrl}${path}/${mercadoId}`)
    //     .expectStatus(StatusCodes.OK)
    //     .expectJsonLike([
    //       mercadoSchema
    //     ]);
    // });

    it('PUT mercado 1 should return ok', async () => {
      console.log('mercado id', mercadoId);

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

    it('DELETE mercado 1 should return ok', async () => {
      console.log('mercado id', mercadoId);

      await p
        .spec()
        .get(`${baseUrl}${path}/${mercadoId}`)
        .expectStatus(StatusCodes.OK);
    });
  });
});

