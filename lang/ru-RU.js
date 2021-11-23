export default () => {
    return new Promise(function (resolve) {
        resolve({
            Common: require('@/lang/ru/common.json'),
            Index: require('@/lang/ru/index.json')
        });
    });
};
