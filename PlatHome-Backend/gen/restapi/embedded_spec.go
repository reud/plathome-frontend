// Code generated by go-swagger; DO NOT EDIT.

package restapi

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"encoding/json"
)

var (
	// SwaggerJSON embedded version of the swagger document used at generation time
	SwaggerJSON json.RawMessage
	// FlatSwaggerJSON embedded flattened version of the swagger document used at generation time
	FlatSwaggerJSON json.RawMessage
)

func init() {
	SwaggerJSON = json.RawMessage([]byte(`{
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "swagger": "2.0",
  "info": {
    "description": "Home Netework Watcher Service",
    "title": "PlatHome",
    "contact": {
      "name": "reud",
      "url": "https://reud.net/",
      "email": "mail@reud.net"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "0.0.1"
  },
  "paths": {
    "/device": {
      "get": {
        "summary": "get All Device  from DB",
        "responses": {
          "200": {
            "description": "get successful",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Device"
              }
            }
          }
        }
      },
      "put": {
        "parameters": [
          {
            "description": "put to DB a new Device",
            "name": "device",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Device"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Devices from DB by ID",
        "parameters": [
          {
            "type": "integer",
            "description": "delete Device",
            "name": "id",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "delete successful",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Device": {
      "type": "object",
      "required": [
        "type",
        "ip",
        "hostname",
        "description",
        "ezRequesterModels"
      ],
      "properties": {
        "description": {
          "type": "string"
        },
        "ezRequesterModels": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EzRequesterModel"
          }
        },
        "hostname": {
          "type": "string"
        },
        "ip": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "EzRequesterModel": {
      "type": "object",
      "required": [
        "protocol",
        "parameter"
      ],
      "properties": {
        "parameter": {
          "type": "string"
        },
        "protocol": {
          "type": "string"
        }
      }
    }
  }
}`))
	FlatSwaggerJSON = json.RawMessage([]byte(`{
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "swagger": "2.0",
  "info": {
    "description": "Home Netework Watcher Service",
    "title": "PlatHome",
    "contact": {
      "name": "reud",
      "url": "https://reud.net/",
      "email": "mail@reud.net"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "0.0.1"
  },
  "paths": {
    "/device": {
      "get": {
        "summary": "get All Device  from DB",
        "responses": {
          "200": {
            "description": "get successful",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Device"
              }
            }
          }
        }
      },
      "put": {
        "parameters": [
          {
            "description": "put to DB a new Device",
            "name": "device",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Device"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Devices from DB by ID",
        "parameters": [
          {
            "type": "integer",
            "description": "delete Device",
            "name": "id",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "delete successful",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Device": {
      "type": "object",
      "required": [
        "type",
        "ip",
        "hostname",
        "description",
        "ezRequesterModels"
      ],
      "properties": {
        "description": {
          "type": "string"
        },
        "ezRequesterModels": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EzRequesterModel"
          }
        },
        "hostname": {
          "type": "string"
        },
        "ip": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "EzRequesterModel": {
      "type": "object",
      "required": [
        "protocol",
        "parameter"
      ],
      "properties": {
        "parameter": {
          "type": "string"
        },
        "protocol": {
          "type": "string"
        }
      }
    }
  }
}`))
}
