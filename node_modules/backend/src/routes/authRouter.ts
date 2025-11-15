import  {Router} from "express";
import {TLoginUser} from "../models/auth.types";
import {ISafeUser} from "../models/auth.interfaces";
import {authLogin} from "../services/auth.service";

const router = Router();


router.get('/ping', (req, res) => {
    console.log("ping request");
    //Todo
    res.status(200).json({message: "Pong"});
});

router.post("/login", (req, res) => {
    console.log("login");
    //Todo
    const loginUser:TLoginUser = req.body as TLoginUser;
    if (!loginUser.username || !loginUser.password) {
        res.status(400).json({error: "username or password is wrong"});
        return;
    }

    const safeUser:ISafeUser | undefined= authLogin(loginUser);
    if (!safeUser) {
        res.status(401).json({error: "user does not exist"});
        return;
    }

    res.status(200).json(safeUser);

})
export default router;