export default function accountsManager (Unique, metaManager) {
    var USER = metaManager.std.user;
    this.checkDuplication = checkDuplication;

    function checkDuplication (data, callback) {
        Unique.get({
            key: data.key,
            value: data.value
        }, function () {
            callback(204);
        }, function (data) {
            callback(data.status, data.data);
        });
    }
}