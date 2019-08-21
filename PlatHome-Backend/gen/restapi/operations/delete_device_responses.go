// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"
)

// DeleteDeviceOKCode is the HTTP code returned for type DeleteDeviceOK
const DeleteDeviceOKCode int = 200

/*DeleteDeviceOK delete successful

swagger:response deleteDeviceOK
*/
type DeleteDeviceOK struct {

	/*
	  In: Body
	*/
	Payload *DeleteDeviceOKBody `json:"body,omitempty"`
}

// NewDeleteDeviceOK creates DeleteDeviceOK with default headers values
func NewDeleteDeviceOK() *DeleteDeviceOK {

	return &DeleteDeviceOK{}
}

// WithPayload adds the payload to the delete device o k response
func (o *DeleteDeviceOK) WithPayload(payload *DeleteDeviceOKBody) *DeleteDeviceOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete device o k response
func (o *DeleteDeviceOK) SetPayload(payload *DeleteDeviceOKBody) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteDeviceOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}