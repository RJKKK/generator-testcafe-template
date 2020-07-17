import {sharedInfo} from '../../shared-module'
import config from './config'
import listAction from './cases'
fixture`${config.unitName}`.page`${config.url}`;

test(config.unitName, async I => {
    sharedInfo[config.unitName] = listAction
    for (let i = 0;i< listAction.length;i++){
        await listAction[i].action(I)
        sharedInfo[config.unitName][i]["isPass"] = true
    }

})
