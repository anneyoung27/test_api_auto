// .mocharc.cjs 
module.exports = {
 spec: 'test_explorer/test_cases/*.js',
 timeout: 5000,
 reporter: 'mochawesome',
 'reporter-option': [
        'reportDir=Report',
        'reportFilename=[status] [datetime]-[name]-report',
        'html=true',
        'json=false',
        'overwrite=false',
        'timestamp=longDate',
 ],
};