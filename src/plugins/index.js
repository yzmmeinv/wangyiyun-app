import { Button, Swipe, SwipeItem, Popup } from 'vant';
import 'vant/lib/index.css';

let plugins = [
    Button, Swipe, SwipeItem,Popup,
]

export default function getVant(app) {
    plugins.forEach(item => {
        return app.use(item)
    });
}