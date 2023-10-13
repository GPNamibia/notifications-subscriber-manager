import { AppBar,LocalesMenuButton, RefreshIconButton,ToggleThemeButton, UserMenu,TitlePortal } from 'react-admin';

export const MyAppBar = () => (
    <AppBar 
        sx={{color: 'white','& .RaAppBar-title': { padding: 0 },backgroundColor:'#c0046c'}}
        toolbar={
            <>
            <LocalesMenuButton />
            {/* <ToggleThemeButton /> */}
             {/* <TitlePortal /> */}
            {/* <RefreshIconButton /> */}
            </>
        }    
    />
);