var ALPHANUM = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',

	// Written with HIJS, because ... why not?
	String = global.String,
	create = Object.create,
	keys = Object.keys,
	defineProperty = Object.defineProperty,
	bind = Function.prototype.bind.bind(Function.prototype.call),
	tie = Function.prototype.bind.bind(Function.prototype.apply),
	push = bind(Array.prototype.push),
	unshift = bind(Array.prototype.unshift),
	pushAll = tie(Array.prototype.push),
	join = bind(Array.prototype.join),
	floor = Math.floor,
	random = Math.random,

	DATA_DESC = (function() {
		var desc = create(null);
		desc.enumerable = false;
		desc.writable = true;
		desc.configurable = true;
		return desc;
	})();



// Interface

function Identifiers(prefixSize, chars) {
	expectObject(this);
	reset(this);
	if (chars !== undefined)
		this._chars = String(chars);
	if (prefixSize !== undefined)
		this._prefixSize = prefixSize | 0;
}

Identifiers.prototype = def({

	_prefixSize: 0,
	_curId: undefined,
	_chars: ALPHANUM,

	reset: contextualize(reset),
	next: contextualize(next)

});

module.exports = def(Identifiers, {

	getRandomChar: function getRandomChar_(chars) {
		return getRandomChar(chars === undefined ? ALPHANUM : String(chars));
	},

	getRandomString: function getRandomString_(length, chars) {
		return getRandomString(
			chars === undefined ? ALPHANUM : String(chars),
			length
		);
	}

});



// Implementation

function reset(obj) {
	obj._curId = [ 0 ];
}

function next(obj) {
	return toIdentifierName(obj._curId, obj._chars, obj._prefixSize);
}

function toIdentifierName(r, chars, prefixSize) {
	var id, i, L;
	expectObject(r);
	chars = String(chars);
	prefixSize = prefixSize | 0;
	id = sack();
	L = r.length | 0;
	for (i = 0; i < prefixSize; i++)
		push(id, getRandomChar(chars));
	for (i = 0; i < L; i++)
		push(id, chars[r[i]]);
	i = r.length - 1;
	r[i]++;
	while (r[i] >= chars.length) {
		r[i] = 0;
		if (i > 0)
			r[i - 1]++;
		else
			unshift(r, 0);
		i--;
	}
	return join(id, '');
}

function getRandomString(chars, length) {
	var r = [ ];
	chars = String(chars);
	length = length | 0;
	for (var i = 0; i < length; i++)
		push(r, getRandomChar(chars));
	return join(r, '');
}

function getRandomChar(chars) {
	chars = String(chars);
	var L = chars.length;
	return chars[floor(random() * L) % L];
}

function isObject(value) {
	var t;
	return value != null && ((t = typeof value) == 'object' || t == 'function');
}

function expectObject(value) {
	if (!isObject(value))
		throw new TypeError('Object expected');
	return value;
}

function sack(array) {
	var r, i;
	r = create(null);
	r.length = 0;
	if (array !== undefined) {
		expectObject(array);
		for (i = 0; i < array.length; i++)
			push(r, array[i]);
	}
	return r;
}

function def(obj, members) {
	var k, i, key;
	if (members === undefined) {
		members = obj;
		obj = { };
	}
	else
		expectObject(obj);
	expectObject(members);
	k = keys(members);
	for (i = 0; i < k.length; i++) {
		key = k[i];
		defineProperty(obj, key,
			dataDesc(members[key])
		);
	}
	return obj;
}

function dataDesc(value) {
	DATA_DESC.value = value;
	return DATA_DESC;
}

function contextualize(f) {
	var F = tie(f);
	return function() {
		var args = [ this ];
		pushAll(args, arguments);
		return F(null, args);
	};
}
