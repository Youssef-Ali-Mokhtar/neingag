import dice from './../assets/dice.jpg';
import grumpyCat from './../assets/grumpy_cat.jpg';
import wtf from './../assets/wtf.jpg';
import heart from './../assets/heart.jpg';
import prof from './../assets/prof.png';

export const matchPicture = (category)=> {
    if(category==='random') {
        return dice;
    } else if(category==='humor') {
        return grumpyCat;
    } else if(category==='wtf') {
        return wtf;
    } else if(category==='relationships') {
        return heart;
    } else {
        return prof;
    }
}