export default () => {
    return new Promise(function (resolve) {
        resolve({
            Common: require('@/lang/en/common.json'),
            Index: require('@/lang/en/index.json')
        });
    });
};
