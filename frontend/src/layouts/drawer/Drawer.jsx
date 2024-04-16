import DrawerClasses from './drawer.module.css';
import { useDrawerContext } from '../../hooks/useDrawerContext';
import DrawerListItem from './DrawerListItem';
import humor from './../../assets/grumpy_cat.jpg'
import relationships from './../../assets/heart.jpg'
import wtf from './../../assets/wtf.jpg'
import home from './../../assets/home.svg';
import random from './../../assets/dice.jpg'
import SearchBar from '../../components/search-bar/SearchBar';

const drawerList = [
    {
        title:'Home', 
        path:'/',
        image: home
    },
    {
        title:'Humor', 
        path:'interest/humor',
        image: humor
    },
    {
        title:'WTF', 
        path:'interest/wtf',
        image: wtf
    },
    {
        title:'Relationships', 
        path:'interest/relationships',
        image: relationships
    },
    {
        title:'Random',
        path:'interest/random',
        image: random
    },
]


const Drawer = () => {
    const {drawer} = useDrawerContext();

    const drawerClass = `${DrawerClasses['drawer']} ${
        drawer ? '' : DrawerClasses['closed']
      }`;

    return ( <div className={drawerClass}>
        <SearchBar device='mobile'/>
        <p className={DrawerClasses['drawer-title']}>Categories</p>
        {
            drawerList.map(item=>{
                return <DrawerListItem
                    key={item.title}
                    path={item.path} 
                    title={item.title}
                    image={item.image}
                    />;
            })
            
        }
        
    </div> );
}

export default Drawer;