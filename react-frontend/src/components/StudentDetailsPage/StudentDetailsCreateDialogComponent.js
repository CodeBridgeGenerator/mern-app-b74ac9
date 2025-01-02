import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const StudentDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.stuId)) {
                error["stuId"] = `StuId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.stuName)) {
                error["stuName"] = `StuName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.NIC)) {
                error["NIC"] = `NIC field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.course)) {
                error["course"] = `Course field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.address)) {
                error["address"] = `Address field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            stuId: _entity?.stuId,stuName: _entity?.stuName,NIC: _entity?.NIC,course: _entity?.course,DOB: _entity?.DOB,address: _entity?.address,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("studentDetails").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info StudentDetails created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in StudentDetails" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create StudentDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="studentDetails-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="stuId">StuId:</label>
                <InputText id="stuId" className="w-full mb-3 p-inputtext-sm" value={_entity?.stuId} onChange={(e) => setValByKey("stuId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stuId"]) ? (
              <p className="m-0" key="error-stuId">
                {error["stuId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="stuName">StuName:</label>
                <InputText id="stuName" className="w-full mb-3 p-inputtext-sm" value={_entity?.stuName} onChange={(e) => setValByKey("stuName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stuName"]) ? (
              <p className="m-0" key="error-stuName">
                {error["stuName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="NIC">NIC:</label>
                <InputText id="NIC" className="w-full mb-3 p-inputtext-sm" value={_entity?.NIC} onChange={(e) => setValByKey("NIC", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["NIC"]) ? (
              <p className="m-0" key="error-NIC">
                {error["NIC"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="course">Course:</label>
                <InputText id="course" className="w-full mb-3 p-inputtext-sm" value={_entity?.course} onChange={(e) => setValByKey("course", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["course"]) ? (
              <p className="m-0" key="error-course">
                {error["course"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="DOB">DOB:</label>
                <Calendar id="DOB"  value={_entity?.DOB ? new Date(_entity?.DOB) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("DOB", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["DOB"]) ? (
              <p className="m-0" key="error-DOB">
                {error["DOB"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address">Address:</label>
                <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) ? (
              <p className="m-0" key="error-address">
                {error["address"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(StudentDetailsCreateDialogComponent);
