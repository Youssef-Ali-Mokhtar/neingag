import DrawerClasses from './drawer.module.css';
import { useDrawerContext } from '../../hooks/useDrawerContext';
import DrawerListItem from './DrawerListItem';

const drawerList = [
    {
        title:'Humor', 
        path:'interest/humor'
    },
    {
        title:'WTF', 
        path:'interest/wtf'

    },
    {
        title:'Relationships', 
        path:'interest/relationships'
    },
    {
        title:'Random',
        path:'interest/random'
    },
]


const Drawer = () => {
    const {drawer} = useDrawerContext();

    const drawerClass = `${DrawerClasses['drawer']} ${
        drawer ? '' : DrawerClasses['closed']
      }`;

    return ( <div className={drawerClass}>
        <p className={DrawerClasses['drawer-title']}>Categories</p>
        {
            drawerList.map(item=>{
                return <DrawerListItem
                    path={item.path} 
                    title={item.title}
                    />;
            })
            
        }
        
    </div> );
}

export default Drawer;