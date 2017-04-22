define({ "api": [
  {
    "type": "delete",
    "url": "/api/client?token=:token",
    "title": "Delete a client",
    "name": "DeleteClient",
    "group": "Client",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "client",
            "description": "<p>Client object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client._id",
            "description": "<p>Unique Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.auth",
            "description": "<p>Unique identifier token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.name",
            "description": "<p>Client name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.port",
            "description": "<p>Port to connec to this client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.ip",
            "description": "<p>Ip of this client</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    auth: \"YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r\",\n    name: \"foo\",\n    _id: \"58fb78b60446283b97c3d6fe\",\n    port: \"0000\",\n    ip: \"0.0.0.0\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_client.js",
    "groupTitle": "Client"
  },
  {
    "type": "get",
    "url": "/api/client/:id?token=:token",
    "title": "Get client by id",
    "name": "GetClient",
    "group": "Client",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "client",
            "description": "<p>Client object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client._id",
            "description": "<p>Unique Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.auth",
            "description": "<p>Unique identifier token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.name",
            "description": "<p>Client name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.port",
            "description": "<p>Port to connec to this client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.ip",
            "description": "<p>Ip of this client</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   auth: \"YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r\",\n   name: \"foobar\",\n   _id: \"58fb78b60446283b97c3d6fe\",\n   port: \"0000\",\n   ip: \"0.0.0.0\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_client.js",
    "groupTitle": "Client"
  },
  {
    "type": "get",
    "url": "/api/clients?token=:token",
    "title": "Get all clients",
    "name": "GetClients",
    "group": "Client",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "clients",
            "description": "<p>Array of Client objects</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client._id",
            "description": "<p>Unique Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.auth",
            "description": "<p>Unique identifier token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.name",
            "description": "<p>Client name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.port",
            "description": "<p>Port to connec to this client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.ip",
            "description": "<p>Ip of this client</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[  \n   {\n       auth: \"YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r\",\n       name: \"foo\",\n       _id: \"58fb78b60446283b97c3d6fe\",\n       port: \"0000\",\n       ip: \"0.0.0.0\"\n   },\n   {\n       auth: \"57ajPqrDGVDRUD4rYYInLOPOQJnQNNSp\",\n       name: \"bar\",\n       _id: \"46283b97c3d6fe58fb78b604\",\n       port: \"1111\",\n       ip: \"8.8.8.8\"\n   }\n\n   ..\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_client.js",
    "groupTitle": "Client"
  },
  {
    "type": "delete",
    "url": "/api/client?token=:token",
    "title": "Ping end-point",
    "name": "PingClient",
    "group": "Client",
    "permission": [
      {
        "name": "client"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Unique client based authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    status: 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_client.js",
    "groupTitle": "Client"
  },
  {
    "type": "post",
    "url": "/api/client?token=:token",
    "title": "Register a new client",
    "name": "RegisterClient",
    "group": "Client",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Client name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "client",
            "description": "<p>Client object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client._id",
            "description": "<p>Unique Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.auth",
            "description": "<p>Unique identifier token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.name",
            "description": "<p>Client name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.port",
            "description": "<p>Client port</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.ip",
            "description": "<p>Client ip</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   auth: \"YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r\",\n   name: \"foobar\",\n   _id: \"58fb78b60446283b97c3d6fe\",\n   port: \"0000\",\n   ip: \"0.0.0.0\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/api/client?token=:token",
    "title": "Update an existing client",
    "name": "UpdateClient",
    "group": "Client",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Client name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ip",
            "description": "<p>Client ip</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "port",
            "description": "<p>Client port</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "client",
            "description": "<p>Client object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client._id",
            "description": "<p>Unique Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.auth",
            "description": "<p>Unique identifier token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.name",
            "description": "<p>Client name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.port",
            "description": "<p>Port to connec to this client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "client.ip",
            "description": "<p>Ip of this client</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   auth: \"YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r\",\n   name: \"foobar\",\n   _id: \"58fb78b60446283b97c3d6fe\",\n   port: \"0000\",\n   ip: \"0.0.0.0\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_client.js",
    "groupTitle": "Client"
  },
  {
    "type": "get",
    "url": "/api/user/:username?token=:token",
    "title": "Get a user by name",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>Unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    username: \"foo\",\n    _id: \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_auth.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users?token=:token",
    "title": "Get all users",
    "name": "GetUsers",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>Unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n   {\n       username: \"foo\",\n       _id: \"1\"\n   },\n   {\n       username: \"bar\",\n       _id: \"2\"\n   }\n\n   ..\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_auth.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login user",
    "name": "Log_in",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users unique password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Unique authentication token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   token: \"123456789abcdefghijklmnopqrstuvwxyz\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_auth.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user",
    "title": "Register a new user",
    "name": "Register_User",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users unique password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    username: \"foo\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/controller_auth.js",
    "groupTitle": "User"
  }
] });
