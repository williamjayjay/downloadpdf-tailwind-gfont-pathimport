import { StatusBar } from 'react-native';
import { Home } from './screens/Home';
import { IMain } from './main.dto';
import { FC } from 'react';
import { useMain } from './main.hook';


export const App: FC<IMain.Input> = (props = { awaitSplashTimer: 1000 }) => {
    const { isLoaded } = useMain(props);

    if (!isLoaded) {
        return null;
    }

    return (
        <>
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />
            <Home />
        </>

    );
};
