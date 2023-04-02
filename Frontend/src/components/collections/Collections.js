import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
  Form,
  ListGroup,
} from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import Header from "../../layouts/header/Header";
import Miniheader from "../../layouts/header/Miniheader";
import { FaSearch } from "react-icons/fa";
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { TiExport } from 'react-icons/ti';
import { FiMoreVertical } from "react-icons/fi";
import { SiPostman } from 'react-icons/si';
import { RiHtml5Fill } from 'react-icons/ri';
import Pagination from "@mui/material/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import * as API from "../../apiservice/Apiservice";
import Image from "./img";
import fileDownload from "js-file-download";
import "./Collections.css";

function Collections() {
  //Spinner
  const [spinner, setSpinner] = useState(false);

  //Pagination code & collection list
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [totalitems, setTotalItems] = useState(undefined);
  const [allcollections, setAllCollections] = useState([]);
  const [collecid, setCollecId] = useState("");

  const [collbysearch, setCollBySearch] = useState('');

  const hostname = window.location.host;

  useEffect(() => {
    setSpinner(true);
    API.getAllCollection(page, rowsPerPage).then((res) => {
      setAllCollections(res.data.data);
      setSpinner(false);
      setTotalItems(res.data.totalInDb);
      setCollBySearch(false);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    API.getAllCollection(newPage, rowsPerPage).then((res) => {
      console.log(res.data.data);
      setAllCollections(res.data.data);
    });
    setPage(newPage);
  };

  const deleteCollec = (e, collec_id) => {
    e.preventDefault();
    setCollecId(collec_id);
    API.deleteCollection(collec_id)
      .then((res) => {
        console.log(res);
        alert("Collection deleted Successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert("Failed to delete collection");
      });
  };

  const exportColl = (e, collection_id, filename) => {
    API.exportCollection(collection_id, {
      responseType: "blob",
    })
      .then((res) => {
        console.log(res);
        fileDownload(JSON.stringify(res.data), filename);
        alert("Collection exported Successfully");
      })
      .catch((err) => {
        alert("Failed to export collection");
      });
  };

  //Download display HTML Document
  const downloadHtml = (e, collection_id, filename) => {
    API.generateDocument(collection_id, {
      responseType: "blob",
    })
      .then((res) => {
        console.log(res);
        fileDownload(res.data, filename);
      })
      .catch((err) => {
        alert("Failed to export collection");
      });
  };

  // Export postman collection
  const downloadPostman = (e, collection_id, hostname, filename) => {
    console.log('POSTMAN FILE', collection_id);
    API.exportPostmanCollection(collection_id, hostname, {
      responseType: "blob",
    })
      .then((res) => {
        console.log(res);
        fileDownload(JSON.stringify(res.data), filename);
      })
      .catch((err) => {
        alert("Failed to export collection");
      });
  };

  const [searchtype, setSearchType] = useState('')
  const searchDropdown = (evt) => {
    console.log(evt.target.value);
    setSearchType(evt.target.value);
  }

  //Search Collection
  const [searchcollection, setSearchCollection] = useState([]);
  const searchCollection = (evt) => {
    if (evt === "") {
      setCollBySearch('');
    } else {
      API.searchCollection(evt).then((res) => {
        console.log(res.data.collectionList);
        setCollBySearch('Collection');
        setSearchCollection(res.data.collectionList);
      });
    }
  };


  const [searchservicebycollection, setSearchServiceByCollection] = useState([]);
  const searchServiceByCollection = (evt) => {
    if (evt === "") {
      setCollBySearch('');
    } else {
      API.getServiceByCollection(evt).then((res) => {
        console.log(res.data.collectionList.length);
        setCollBySearch('ServiceCollection');
        setSearchServiceByCollection(res.data.collectionList);
      }).catch((err) => {
        setSearchServiceByCollection([]);
      })
    }
  };

  return (
    <div>
      <Header />
      <Miniheader />
      <Container className="container-box">
        <div className="mt-3">
          <h3>Collections</h3>
        </div>
        {spinner === true ?
          <CircularProgress className="mt-3" color="secondary" />
          :
          <div>
            <div className="col-11">
              <InputGroup className="my-3 rounded-0">
                <div className="col-2">
                  <Form.Select onChange={(evt) => searchDropdown(evt)} style={{ backgroundColor: "#EDE7F6" }}>
                    <option selected disabled>Search By</option>
                    <option value="collection">Collection</option>
                    <option value="service">Service</option>
                  </Form.Select>
                </div>
                {searchtype === "collection" ?
                  <>
                    <Form.Control
                      type="search"
                      placeholder="Search a Collection"
                      onChange={(event) => { searchCollection(event.target.value) }}
                    />
                  </>
                  : searchtype === "service" ?
                    <>
                      <Form.Control
                        type="search"
                        placeholder="Search a Service"
                        onChange={(event) => { searchServiceByCollection(event.target.value) }}
                      />
                    </>
                    :
                    <>
                      <Form.Control
                        type="search"
                        placeholder="Search a Collection or Service"
                        disabled
                      />
                    </>
                }
                <InputGroup.Text className="text-white rounded-0" style={{ backgroundColor: "#65499c" }}>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </div>
            <div className="mt-2">
              {collbysearch === 'Collection' ? (
                <Row>
                  {searchcollection.map((j) => (
                    <Col className="col-4 mt-4">
                      <Card style={{ width: "300px", height: "325px" }}>
                        <Image collection_id={j.collection_id} />
                        <Card.Body>
                          <h5 class="card-title">{j.collection_name}</h5>
                          <p class="card-text">
                            {j.collection_desc.slice(0, 30)}.....
                          </p>
                          <Row>
                            <Col>
                              <Link
                                to="/services"
                                state={{
                                  collectionname: j.collection_name,
                                  collectionid: j.collection_id,
                                  collectiondesc: j.collection_desc,
                                }}
                              >
                                <Button variant="primary">Details</Button>
                              </Link>
                            </Col>
                            <Col>
                              <DropdownButton
                                className="d-flex justify-content-end"
                                variant="primary"
                                title={<FiMoreVertical />}
                              >
                                <Dropdown.Item
                                  as={Link}
                                  to="/editcollection"
                                  state={{
                                    collectionname: j.collection_name,
                                    collectionid: j.collection_id,
                                    collectiondesc: j.collection_desc,
                                    collectionimage: j.collection_image,
                                  }}
                                >
                                  <TbEdit />&nbsp;Edit Collection
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    deleteCollec(e, j.collection_id);
                                  }}
                                >
                                  <MdDelete />&nbsp;Delete Collection
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    exportColl(
                                      e,
                                      j.collection_id,
                                      `${j.collection_name}.json`
                                    );
                                  }}
                                >
                                  <TiExport />&nbsp;Export Collection
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    downloadHtml(e,
                                      j.collection_id,
                                      `${j.collection_name}.html`
                                    );
                                  }}>
                                  <RiHtml5Fill />&nbsp;Download HTML file
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    downloadPostman(
                                      e,
                                      j.collection_id,
                                      hostname,
                                      `${j.collection_name}.json`
                                    );
                                  }}>
                                  <SiPostman />&nbsp;Export as Postman Collection
                                </Dropdown.Item>
                              </DropdownButton>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : collbysearch === 'ServiceCollection' ? (
                <Row>
                  {searchservicebycollection.map((k) => (
                    <Col className="col-4 mt-4">
                      <Card style={{ width: "auto", height: "auto" }}>
                        <Image collection_id={k.collection_id} />
                        <Card.Body>
                          <h5 class="card-title">{k.collection_name}</h5>
                          <p class="card-text">
                            {k.collection_desc.slice(0, 30)}.....
                          </p>
                          <Row>
                            <Col>
                              <Link
                                to="/services"
                                state={{
                                  collectionname: k.collection_name,
                                  collectionid: k.collection_id,
                                  collectiondesc: k.collection_desc,
                                }}
                              >
                                <Button variant="primary">Details</Button>
                              </Link>
                            </Col>
                            <Col>
                              <DropdownButton
                                className="d-flex justify-content-end"
                                variant="primary"
                                title={<FiMoreVertical />}
                              >
                                <Dropdown.Item
                                  as={Link}
                                  to="/editcollection"
                                  state={{
                                    collectionname: k.collection_name,
                                    collectionid: k.collection_id,
                                    collectiondesc: k.collection_desc,
                                    collectionimage: k.collection_image,
                                  }}
                                >
                                  <TbEdit />&nbsp;Edit Collection
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    deleteCollec(e, k.collection_id);
                                  }}
                                >
                                  <MdDelete />&nbsp;Delete Collection
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    exportColl(
                                      e,
                                      k.collection_id,
                                      `${k.collection_name}.json`
                                    );
                                  }}
                                >
                                  <TiExport />&nbsp;Export Collection
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    downloadHtml(e,
                                      k.collection_id,
                                      `${k.collection_name}.html`
                                    );
                                  }}>
                                  <RiHtml5Fill />&nbsp;Download HTML file
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    downloadPostman(
                                      e,
                                      k.collection_id,
                                      hostname,
                                      `${k.collection_name}.json`
                                    );
                                  }}>
                                  <SiPostman />&nbsp;Export as Postman Collection
                                </Dropdown.Item>
                              </DropdownButton>
                            </Col>
                          </Row>
                          <div className="my-2">
                            <strong className="text-primary">Service Names:</strong>
                            <ListGroup>
                              {k.service.map((p) =>
                                <ListGroup.Item>{p.service_name}</ListGroup.Item>
                              )}
                            </ListGroup>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) :
                <Row>
                  {allcollections.map((i) => (
                    <Col className="col-4 mt-4">
                      <Card style={{ width: "300px", height: "325px" }}>
                        <Image collection_id={i.collection_id} />
                        <Card.Body>
                          <h5 class="card-title">{i.collection_name}</h5>
                          <p class="card-text">
                            {i.collection_desc.slice(0, 30)}.....
                          </p>
                          <Row ClassName="mt-3">
                            <Col>
                              <Link
                                to="/services"
                                state={{
                                  collectionname: i.collection_name,
                                  collectionid: i.collection_id,
                                  collectiondesc: i.collection_desc,
                                }}
                              >
                                <Button variant="primary">Details</Button>
                              </Link>
                            </Col>
                            <Col className="col-3">
                              <Tooltip
                                title="More Options" placement="top" arrow
                                componentsProps={{
                                  tooltip: {
                                    sx: {
                                      bgcolor: '#65499c',
                                      '& .MuiTooltip-arrow': {
                                        color: '#65499c',
                                      },
                                    },
                                  },
                                }}>
                                <DropdownButton
                                  className="d-flex justify-content-end"
                                  variant="primary"
                                  title={<FiMoreVertical />}
                                >
                                  <Dropdown.Item
                                    as={Link}
                                    to="/editcollection"
                                    state={{
                                      collectionname: i.collection_name,
                                      collectionid: i.collection_id,
                                      collectiondesc: i.collection_desc,
                                      collectionimage: i.collection_image,
                                    }}
                                  >
                                    <TbEdit />&nbsp;Edit Collection
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      deleteCollec(e, i.collection_id);
                                    }}
                                  >
                                    <MdDelete />&nbsp;Delete Collection
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      exportColl(
                                        e,
                                        i.collection_id,
                                        `${i.collection_name}.json`
                                      );
                                    }}
                                  >
                                    <TiExport />&nbsp;Export Collection
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      downloadHtml(
                                        e,
                                        i.collection_id,
                                        `${i.collection_name}.html`
                                      );
                                    }}>
                                    <RiHtml5Fill />&nbsp;Download HTML file
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      downloadPostman(
                                        e,
                                        i.collection_id,
                                        hostname,
                                        `${i.collection_name}.json`
                                      );
                                    }}>
                                    <SiPostman />&nbsp;Export as Postman Collection
                                  </Dropdown.Item>
                                </DropdownButton>
                              </Tooltip>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              }
            </div>
            <div className="d-flex align-items-end justify-content-center my-4">
              <Pagination
                count={Math.ceil(totalitems / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                size="large"
                shape="rounded"
                className="rounded-0"
              />
            </div>
          </div>
        }
      </Container>
    </div>
  );
}

export default Collections;
