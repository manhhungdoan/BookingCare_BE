import patientService from '../services/patientService';

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

let verifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.verifyBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

module.exports = {
    postBookAppointment,
    verifyBookAppointment,
};
