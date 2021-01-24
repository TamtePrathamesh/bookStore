/* eslint-disable import/no-anonymous-default-export */
import loadable from "@loadable/component";

export default (Component) => loadable(() => Component);
