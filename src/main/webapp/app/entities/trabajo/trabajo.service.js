(function() {
    'use strict';
    angular
        .module('littletimmyApp')
        .factory('Trabajo', Trabajo);

    Trabajo.$inject = ['$resource', 'DateUtils'];

    function Trabajo ($resource, DateUtils) {
        var resourceUrl =  'api/trabajos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.fechaInicio = DateUtils.convertLocalDateFromServer(data.fechaInicio);
                        data.fechaFin = DateUtils.convertLocalDateFromServer(data.fechaFin);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaInicio = DateUtils.convertLocalDateToServer(copy.fechaInicio);
                    copy.fechaFin = DateUtils.convertLocalDateToServer(copy.fechaFin);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaInicio = DateUtils.convertLocalDateToServer(copy.fechaInicio);
                    copy.fechaFin = DateUtils.convertLocalDateToServer(copy.fechaFin);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
