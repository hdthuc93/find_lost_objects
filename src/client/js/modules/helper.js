var module = angular.module("mod.helper", []);

module.factory("helper", [helper]);

function helper() {
    return {
        sayHello: function (name) {
            return "Hi " + name + "!";
        }
    }
}