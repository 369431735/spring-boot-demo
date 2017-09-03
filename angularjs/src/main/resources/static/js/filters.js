/* Filters */

angular.module('filters', []).filter('Pay_Status', function() {
	return function(order) {
		if (order.payment_state == 0 && order.order_state == 0) {
			return "未支付";
		} else if (order.payment_state == 1) {
			return "已支付";
		} else if (order.order_state == 2) {
			return "-";
		}
	}
}).filter('Isship', function() {
	return function(order) {
		if (order.send_state == 0 && order.order_state == 0) {
			return "未发货";
		} else if (order.send_state == 1) {
			return "已发货";
		} else if (order.order_state == 2) {
			return "-";
		}
	}
}).filter('Receipt_Status', function() {
	return function(order) {
		if (order.send_state == 0 && order.order_state == 0) {
			return "未收货";
		} else if (order.send_state == 1) {
			return "已收货";
		} else if (order.order_state == 2) {
			return "-";
		}
	}
}).filter('Order_Status', function() {
	return function(order) {
		if (order.order_state == 0) {
			return "未完成";
		} else if (order.send_state == 1) {
			return "已完成";
		} else if (order.order_state == 2) {
			return "已取消";
		}
	}
});
