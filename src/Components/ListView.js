import React, { useState, useEffect } from "react";
import "./Listview.css";
import { ListCreation } from "./ServerCall";
import { Card } from "react-bootstrap";
import { LIST_OBJECT } from "./Constant";
import Spinner from "react-bootstrap/Spinner";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

export default function ListView() {
  const [ListItems1, setListItems1] = useState([]);
  const [ListItems2, setListItems2] = useState([]);
  const [ListItems3, setListItems3] = useState([]);
  const [isProgress, setIsProgress] = useState(false);
  const [List1, setList1] = useState(false);
  const [List2, setList2] = useState(false);
  const [create, setCreate] = useState("");
  const [create2, setCreate2] = useState("");
  const ListViewItems = async () => {
    setIsProgress(true);
    let Res = await ListCreation();
    if (Res?.status === LIST_OBJECT?.STATUS_CODE) {
      setIsProgress(false);
      setListItems1(Res?.data?.lists?.slice(0, 25));
      setListItems2(Res?.data?.lists?.slice(25));
    }
  };
  useEffect(() => {
    ListViewItems();
  }, []);
  const HandleCheckBox1 = (event) => {
    if (event.target.checked === true) {
      setCreate("");
    }
    setList1(event.target.checked);
  };
  const HandleCheckBox2 = (event) => {
    if (event.target.checked === true) {
      setCreate("");
    }
    setList2(event.target.checked);
  };
  const HandleCreate = () => {
    if (List1 && List2) {
      setCreate2("checkboxtrue");
    }

    setCreate("add");
  };
  const HandleSwapData = (item, val) => {
    if (val === LIST_OBJECT?.LIST1) {
      setListItems1(ListItems1?.filter((i) => i?.id !== item?.id));
    } else {
      setListItems2(ListItems2?.filter((i) => i?.id !== item?.id));
    }

    setListItems3([...ListItems3, item]);
  };
  const HandleMiddleSawp = (item, val) => {
    if (val === "left") {
      setListItems1([...ListItems1, item]);
    } else {
      setListItems2([...ListItems2, item]);
    }
    setListItems3(ListItems3?.filter((i) => i?.id !== item?.id));
  };
  const HandleUpdate = () => {
    setCreate2("update");
    setListItems3(ListItems2);
    setListItems2(ListItems3);
  };
  return (
    <div>
      {isProgress ? (
        <div className="progress-bar">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="center-list">
            <div className="list-creation"> {LIST_OBJECT?.LIST_CREATION}</div>
            <div className="create-list-btn" onClick={() => HandleCreate()}>
              {" "}
              {LIST_OBJECT?.CREATE_NEWLIST}
            </div>
          </div>
          <div className="center-list2 mt-3">
            {(!List1 || !List2) && create === "add" ? (
              <span className="err-msg">{LIST_OBJECT?.ERR_MEG}</span>
            ) : (
              ""
            )}
          </div>
          <div className="mt-4 mx-2 d-flex flex-wrap gap-2">
            <Card className="mx-3">
              <Card.Body className="card-styles">
                <div>
                  <span>
                    <span>
                      {create2 !== "checkboxtrue" && (
                        <input
                          type="checkbox"
                          value={List1}
                          onChange={(e) => HandleCheckBox1(e)}
                        />
                      )}
                    </span>
                    <span className="mx-2">{LIST_OBJECT?.LIST1}</span>{" "}
                    {List1 && List2 && create === "add" && (
                      <span>({ListItems1?.length})</span>
                    )}
                  </span>
                  <div>
                    {ListItems1?.map((item) => (
                      <div className="small-card mt-1 mx-3">
                        <div className="item-name mx-2">{item?.name}</div>
                        <div className="item-decription mx-2">
                          {item?.description}
                        </div>
                        {List1 &&
                          List2 &&
                          create === "add" &&
                          create2 === "checkboxtrue" && (
                            <div className="right-icon mt-2">
                              <GoArrowRight
                                onClick={() =>
                                  HandleSwapData(item, LIST_OBJECT?.LIST1)
                                }
                              />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>

            {List1 && List2 && create === "add" && (
              <Card className="mx-3">
                <Card.Body className="card-styles">
                  <div>
                    <span>
                      <span>
                        {create2 !== "checkboxtrue" && (
                          <input
                            type="checkbox"
                            value={List1}
                            onChange={(e) => HandleCheckBox1(e)}
                          />
                        )}
                      </span>
                      <span className="mx-2">
                        {create2 === "update"
                          ? LIST_OBJECT?.LIST2
                          : LIST_OBJECT?.LIST3}
                      </span>{" "}
                      <span>({ListItems3?.length})</span>
                    </span>
                    <div>
                      {ListItems3?.map((item) => (
                        <div className="small-card mt-1 mx-3">
                          <div className="item-name mx-2">{item?.name}</div>
                          <div className="item-decription mx-2">
                            {item?.description}
                          </div>
                          <div className="center-icon mt-2 mx-2">
                            {create2 === "checkboxtrue" && (
                              <GoArrowLeft
                                onClick={() => HandleMiddleSawp(item, "left")}
                              />
                            )}
                            {create2 === "checkboxtrue" && (
                              <GoArrowRight
                                onClick={() => HandleMiddleSawp(item, "right")}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card.Body>
                {List1 && List2 && create === "add"}
              </Card>
            )}

            <Card className="mx-3">
              <Card.Body className="card-styles">
                <div>
                  <span>
                    <span>
                      {create2 !== "checkboxtrue" && (
                        <input
                          type="checkbox"
                          value={List2}
                          onChange={(e) => HandleCheckBox2(e)}
                        />
                      )}
                    </span>
                    <span className="mx-2">
                      {" "}
                      {create2 === "update"
                        ? LIST_OBJECT?.LIST3
                        : LIST_OBJECT?.LIST2}
                    </span>{" "}
                    {List1 && List2 && create === "add" && (
                      <span>({ListItems2?.length})</span>
                    )}
                  </span>
                  <div>
                    {ListItems2?.map((item) => (
                      <div className="small-card mt-1 mx-3">
                        <div className="item-name mx-2">{item?.name}</div>
                        <div className="item-decription mx-2">
                          {item?.description}
                        </div>
                        {List1 &&
                          List2 &&
                          create === "add" &&
                          create2 === "checkboxtrue" && (
                            <div className="right-icon mt-2">
                              <GoArrowLeft
                                onClick={() =>
                                  HandleSwapData(item, LIST_OBJECT?.LIST2)
                                }
                              />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <>
            {List1 && List2 && create === "add" ? (
              <div className="center-list2 mt-2 gap-4">
                <div className="list-Cancel-btn">
                  {" "}
                  <span>{LIST_OBJECT?.CANCEL}</span>
                </div>
                <div
                  className="create-Update-btn"
                  onClick={() => HandleUpdate()}
                >
                  {" "}
                  <span>{LIST_OBJECT?.UPDATE}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        </>
      )}
    </div>
  );
}
