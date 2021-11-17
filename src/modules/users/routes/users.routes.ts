import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersConstroller';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);



usersRouter.get('/', isAuthenticated, usersController.index);


usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
            email: Joi.string().required(),
            senha: Joi.string().required(),
            telefone: Joi.string().required(),
        },
    }),
    usersController.create
);

usersRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.delete
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update,
);

usersRouter.put(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
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
    usersController.update,
);

usersRouter.post(
    '/disable/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    usersController.disable,
);


usersRouter.post(
    '/active/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    usersController.active,
);


export default usersRouter;