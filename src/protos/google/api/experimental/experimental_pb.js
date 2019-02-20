/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_api_annotations_pb = require('../../../google/api/annotations_pb.js');
var google_api_experimental_authorization_config_pb = require('../../../google/api/experimental/authorization_config_pb.js');
goog.exportSymbol('proto.google.api.Experimental', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.api.Experimental = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.api.Experimental, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.api.Experimental.displayName = 'proto.google.api.Experimental';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.api.Experimental.prototype.toObject = function(opt_includeInstance) {
  return proto.google.api.Experimental.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.api.Experimental} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.Experimental.toObject = function(includeInstance, msg) {
  var f, obj = {
    authorization: (f = msg.getAuthorization()) && google_api_experimental_authorization_config_pb.AuthorizationConfig.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.api.Experimental}
 */
proto.google.api.Experimental.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.Experimental;
  return proto.google.api.Experimental.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.Experimental} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.Experimental}
 */
proto.google.api.Experimental.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 8:
      var value = new google_api_experimental_authorization_config_pb.AuthorizationConfig;
      reader.readMessage(value,google_api_experimental_authorization_config_pb.AuthorizationConfig.deserializeBinaryFromReader);
      msg.setAuthorization(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.api.Experimental.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.api.Experimental.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.Experimental} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.Experimental.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAuthorization();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      google_api_experimental_authorization_config_pb.AuthorizationConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional AuthorizationConfig authorization = 8;
 * @return {?proto.google.api.AuthorizationConfig}
 */
proto.google.api.Experimental.prototype.getAuthorization = function() {
  return /** @type{?proto.google.api.AuthorizationConfig} */ (
    jspb.Message.getWrapperField(this, google_api_experimental_authorization_config_pb.AuthorizationConfig, 8));
};


/** @param {?proto.google.api.AuthorizationConfig|undefined} value */
proto.google.api.Experimental.prototype.setAuthorization = function(value) {
  jspb.Message.setWrapperField(this, 8, value);
};


proto.google.api.Experimental.prototype.clearAuthorization = function() {
  this.setAuthorization(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.api.Experimental.prototype.hasAuthorization = function() {
  return jspb.Message.getField(this, 8) != null;
};


goog.object.extend(exports, proto.google.api);