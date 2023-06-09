import db from '../models/index';
import CRUDService from '../services/CRUDService';
import homeServices from '../services/homeServices'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let postSearchHome = async (req, res) => {
    let keyword = req.query.keyword;
    try {
        let result = await homeServices.postSearchHomePage(keyword)
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: e,
        });
    }
};
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    return res.send('post crud server');
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData);
        return res.render('editCRUD.ejs', {
            user: userData,
        });
    } else {
        return res.send('Not found');
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers,
    });
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('succeed');
    } else {
        return res.send('not found');
    }
};

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
    postSearchHome,
};
