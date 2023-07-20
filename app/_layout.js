import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navigator from "../components/Navigator";
SplashScreen.preventAutoHideAsync();
const Layout = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default Layout;
