import { testChromeRuntimeOnConnect, testChromeRuntimeOnMessage } from "../utils/test"

testChromeRuntimeOnMessage('side_panel')

testChromeRuntimeOnConnect('side_panel')