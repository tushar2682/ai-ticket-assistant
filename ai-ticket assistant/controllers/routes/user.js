import {} from ".../controllers/user.js";
import { authenticate } from "../../middlewares/auth";

const router = express.Router();
router.post("/update-user",)
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/user', authenticate, getUser);

export default router;