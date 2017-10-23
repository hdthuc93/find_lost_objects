var app = angular.module("myMatrix");

app.controller("mainCtrl", ['$scope', '$rootScope', 'helper', mainCtrl]);
function mainCtrl($scope, $rootScope, helper) {
    var lang = {
        vi: {
            lang: "Ngôn ngữ",
            en: "Tiếng Anh",
            vi: "Tiếng Việt",
            mainTitle: "Trường đại học Khoa học tự nhiên",
            subTitle: "Hệ thống giải bài tập ma trận",
            add: "Thêm",
            delete: "Xoá",
            edit: "Sửa",
            save: "Lưu",
            notification: "Thông báo",
            error: "Lỗi",
            notFoundPageTitle: "404 Không tìm thấy",
            notFoundPageDetail: "Trang bạn tìm không tồn tại",
            loading: "Đang tải",
            processing: "Đang xử lý",
            noData: "Không có dữ liệu",
            menu: "menu",
            home: "Trang chủ",
            config: "Cài đặt",
            createSuccess: "Tạo mới thành công",
            deleteSuccess: "Xoá thành công",
            editSuccess: "Cập nhật thành công",
            createFail: "Tạo mới thất bại",
            deleteFail: "Xoá thất bại",
            editFail: "Cập nhật thất bại",
            occurError: "Có lỗi xảy ra, vui lòng kiểm tra lại hệ thống"
        },
        en: {
            lang: "Language",
            en: "English",
            vi: "Vietnamese",
            mainTitle: "Ho Chi Minh University of science",
            subTitle: "Solve Matrix Exercises System",
            add: "Add",
            delete: "Delete",
            edit: "Edit",
            save: "Save",
            notification: "Notification",
            error: "Error",
            notFoundPageTitle: "404 Not found",
            notFoundPageDetail: "Page not found",
            loading: "Loading",
            processing: "Processing",
            noData: "No data",
            menu: "menu",
            home: "Home",
            config: "Configuration",
            createSuccess: "Created successfull",
            deleteSuccess: "Deleted successfull",
            editSuccess: "Updated successfull",
            createFail: "Create failed",
            deleteFail: "Delete failed",
            editFail: "Update failed",
            occurError: "An error occurred, please check your system"
        }
    }
    $rootScope.lang = {};
    $scope.systemLanguage = "vi";
    $rootScope.lang = lang[$scope.systemLanguage];
    $scope.changeLanguage = function () {
        $rootScope.lang = lang[$scope.systemLanguage];
    }


}