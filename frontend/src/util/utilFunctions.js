import { formatDistanceToNow } from 'date-fns';
import dice from './../assets/dice.jpg';
import grumpyCat from './../assets/grumpy_cat.jpg';
import wtf from './../assets/wtf.jpg';
import heart from './../assets/heart.jpg';
import prof from './../assets/prof.png';
import kevin from './../assets/avatar_pics/kevin.jpg';
import batman from './../assets/avatar_pics/batman.jpg';
import dog from './../assets/avatar_pics/dog.png';
import doom from './../assets/avatar_pics/doom.png';
import mrBean from './../assets/avatar_pics/mr_bean.jpg';
import walter from './../assets/avatar_pics/walter.png';
import fry from './../assets/avatar_pics/fry.png';
import goku from './../assets/avatar_pics/goku.png';
import facepalm from './../assets/avatar_pics/facepalm.png';

const picsArray = [
    kevin,
    prof,
    batman,
    dog,
    doom,
    mrBean,
    walter,
    fry,
    goku,
    facepalm
];

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

export const formatDate = (timestamp)=> {
    if(!timestamp) {
        return;
    }
    const postTimestamp = new Date(timestamp);
    const difference = formatDistanceToNow(postTimestamp, { addSuffix: true });

    return difference;
} 

export const capitalizeFirstLetter = (str)=> {
    if(!str) return;

    if(str==='wtf') return str.toUpperCase();

    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const pickAvatar = ()=> {
    const randomNum = Math.floor(Math.random()*10);
    return { pic:picsArray[randomNum], num: randomNum };
}

export const extractAvatar = (avatarNum)=> {
    return picsArray[avatarNum];
}