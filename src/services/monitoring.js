import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        connectionString: "YOUR_CONNECTION_STRING",
        extensions: [reactPlugin],
        enableAutoRouteTracking: true,
        enableAjaxPerfTracking: true,
    }
});

appInsights.loadAppInsights();
export { reactPlugin, appInsights };
