import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import * as pages from '../pages'

export default function ItemRouter() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route index path="/" component={pages.ItemPage} />
                </Switch>
            </Router>
        </div>
    );
}
