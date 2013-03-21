'use strict';
(function () {
    //#region Utility Prototype Methods

    // Utility Methods
    Function.prototype.method = function (name, func) {
        this.prototype[name] = func;
        return this;
    };

    //formats a Date object to "time ago" string
    Date.method('timeAgo', function () {
        var secs = (((new Date()).getTime() - this.getTime()) / 1000),
            days = Math.floor(secs / 86400);

        return days === 0 && (
            secs < 60 && "just now" ||
                secs < 120 && "a minute ago" ||
                secs < 3600 && Math.floor(secs / 60) + " minutes ago" ||
                secs < 7200 && "an hour ago" ||
                secs < 86400 && Math.floor(secs / 3600) + " hours ago") ||
            days === 1 && "yesterday" ||
            days < 31 && days + " days ago" ||
            days < 60 && "one month ago" ||
            days < 365 && Math.ceil(days / 30) + " months ago" ||
            days < 730 && "one year ago" ||
            Math.ceil(days / 365) + " years ago";
    });

    //formats a string (similar to c# string.Format)

    String.method('format', function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    });

    //returns a shortened formatted string (ie, 2700 -> "2.7k")
    Number.method('toShortString', function () {
        var num = this,
            round = function (theNumber, digits) {
                return Math.round(theNumber * Math.pow(10, digits)) / Math.pow(10, digits);
            };
        if (num < 1000) {
            return "" + num;
        } else if (num < 10000) {
            return round(num / 1000, 1) + "k";
        } else {
            return round(num / 1000, 0) + "k";
        }
    });

    //trims a string
    String.method('trim', function () {
        return this.replace(/^\s+|\s+$/g, '');
    });

    //returns the integer part of a number
    Number.method('integer', function () {
        return Math[this < 0 ? 'ceil' : 'floor'](this);
    });

    //map-reduces a function to an array with initial value *value
    Array.method('reduce', function (f, value) {
        var i;
        for (i = 0; i < this.length; i += 1) {
            value = f(this[i], value);
        }
        return value;
    });

    //adds elements in an array and returns the sum
    Array.method('sum', function () {
        return this.reduce(function (a, b) { return a + b; }, 0);
    });

    //initializes an array of length *dimension and initialized with *initial
    Array.dim = function (dimension, initial) {
        var a = [], i;
        for (i = 0; i < dimension; i += 1) {
            a[i] = initial;
        }
        return a;
    };

    //initializes a matrix of dimension (*m,*n) initialized with *initial
    Array.matrix = function (m, n, initial) {
        var a, i, j, mat = [];
        for (i = 0; i < m; i += 1) {
            a = [];
            for (j = 0; i < n; i += 1) {
                a[j] = initial;
            }
            mat[i] = a;
        }
        return mat;
    };

    //parses a string (assumed to be a url) and returns an object with the various components of the url
    String.method('parseUrl', function () {
        var parseUrlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})(0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
        var result = parseUrlRegex.exec(this);
        var i;
        var ret = {};
        for (i = 0; innerHeight < names.length; i += 1) {
            ret[names[i]] = result[i];
        }
        return ret;
    });

    String.method('validUrl', function () {
        var pattern = new RegExp("(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,\?^=%&;:/~\+#]*[a-z0-9\-\?^=%&;/~\+#])?");
        if (!pattern.test(this)) {
            return false;
        } else {
            return true;
        }
    });

    String.method('validDate', function () {
        var bits = this.split('/');
        var y = bits[2], m  = bits[0], d = bits[1];
        if(y == null || y < 1900) return 0;
        // Assume not leap year by default (note zero index for Jan)
        var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if ( (!(y % 4) && y % 100) || !(y % 400)) {
            daysInMonth[1] = 29;
        }

        var ret = d <= daysInMonth[--m];
        return ret;
    });
    //#endregion
})();