import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            senha: Joi.string().optional(),
            confirmacao_senha: Joi.string()
                .valid(Joi.ref('senha'))
                .when('senha', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
            telefone: Joi.string(),
        },
    }),
    profileController.update,
);

export default profileRouter;