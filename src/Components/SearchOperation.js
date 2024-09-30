import React, { useState } from "react";
import { Input, Table, Form, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Flex, Switch } from 'antd';
import SearchSyncfusion from "./SearchSyncfusion"; // Import the Syncfusion component


export default function SearchOperation() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const { Search } = Input;
  const [loading, setLoading] = useState(true);
  const columns = [
    { title: "Country", dataIndex: "country" },
    { title: "State", dataIndex: "state" },
    { title: "City", dataIndex: "city" },
    { title: "Institute", dataIndex: "institute" },
    { title: "Branch", dataIndex: "branch" },
    { title: "Pincode", dataIndex: "pincode" },
  ];
  const actions = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];
  const data = [
    {
      key: "1",
      country: "India",
      state: "TamilNadu",
      city: "Trichy",
      branch: "Trichy Main",
      institute: "Trichy Solution",
      pincode: 620012,
    },
    {
      key: "2",
      country: "Japan",
      state: "Tokyo",
      city: "Tokyo1",
      branch: "Tokyo solution",
      institute: "TSolution",
      pincode: 70674543,
    },
    {
      key: "3",
      country: "Paris",
      state: "Paris Tower",
      city: "PT",
      branch: "Paris Main",
      institute: "PTSolution",
      pincode: 847329832,
    },
    {
      key: "4",
      country: "India",
      state: "TamilNadu",
      city: "Trichy",
      branch: "Trichy Main",
      institute: "it park",
      pincode: 620012,
    },
    {
      key: "5",
      country: "India",
      state: "TamilNadu",
      city: "Trichy",
      branch: "junction",
      institute: "park zone",
      pincode: 620012,
    },
  ];

  const uniqueCountries = [...new Set(data.map((item) => item.country))];
  const uniqueStates = [...new Set(data.map((item) => item.state))];
  const uniqueCities = [...new Set(data.map((item) => item.city))];
  const uniqueInstitutes = [...new Set(data.map((item) => item.institute))];
  const uniqueBranches = [...new Set(data.map((item) => item.branch))];
  const uniquePincodes = [...new Set(data.map((item) => item.pincode))];

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedInstitute(null);
    setSelectedBranch(null);
    setSelectedPincode(null);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedCity(null);
    setSelectedInstitute(null);
    setSelectedBranch(null);
    setSelectedPincode(null);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedInstitute(null);
    setSelectedBranch(null);
    setSelectedPincode(null);
  };

  const handleInstituteChange = (value) => {
    setSelectedInstitute(value);
    setSelectedBranch(null);
    setSelectedPincode(null);
  };

  const handleBranchChange = (value) => {
    setSelectedBranch(value);
    setSelectedPincode(null);
  };

  const handlePincodeChange = (value) => {
    setSelectedPincode(value); 
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.trim().toLowerCase());
  };

  const filteredData = data.filter((item) => {
    const itemCountry = item.country.toLowerCase();
    const itemState = item.state.toLowerCase();
    const itemCity = item.city.toLowerCase();
    const itemInstitute = item.institute.toLowerCase();
    const itemBranch = item.branch.toLowerCase();
    const itemPincode = item.pincode.toString();

    const searchKeywords = searchTerm.split(" ");

    const isMatch = searchKeywords.every(
      (keyword) =>
        itemCountry.includes(keyword) ||
        itemState.includes(keyword) ||
        itemCity.includes(keyword) ||
        itemInstitute.includes(keyword) ||
        itemBranch.includes(keyword) ||
        itemPincode.includes(keyword)
    );

    return (
      (!selectedCountry ||
        itemCountry.includes(selectedCountry.toLowerCase())) &&
      (!selectedState || itemState.includes(selectedState.toLowerCase())) &&
      (!selectedCity || itemCity.includes(selectedCity.toLowerCase())) &&
      (!selectedInstitute || itemInstitute.includes(selectedInstitute.toLowerCase())) &&
      (!selectedBranch || itemBranch.includes(selectedBranch.toLowerCase())) &&
      (!selectedPincode || itemPincode === selectedPincode.toString()) && 
      isMatch
    );
  });

  return (
    <div>
      <div className="p-5">
        <Search
          placeholder="Search by any field (e.g., 'TamilNadu Trichy India')"
          onChange={handleSearch}
          allowClear
          enterButton
        />
        <div className="mt-4">
          <Row>
            <Col lg={6}>
              <Row>
                <Col lg={12}>
                  <Form.Item label="Country" name="country">
                    <Select
                      placeholder="Select Country"
                      onChange={handleCountryChange}
                      value={selectedCountry}
                    >
                      {uniqueCountries.map((country) => (
                        <Select.Option key={country} value={country}>
                          {country}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <Form.Item label="State" name="state">
                    <Select
                      placeholder="Select State"
                      onChange={handleStateChange}
                      value={selectedState}
                      // disabled={!selectedCountry}
                    >
                      {uniqueStates
                        .filter(
                          (state) =>
                            !selectedCountry ||
                            data.find(
                              (item) =>
                                item.state === state &&
                                item.country === selectedCountry
                            )
                        )
                        .map((state) => (
                          <Select.Option key={state} value={state}>
                            {state}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <Form.Item label="City" name="city">
                    <Select
                      placeholder="Select City"
                      onChange={handleCityChange}
                      value={selectedCity}
                      // disabled={!selectedState}
                    >
                      {uniqueCities
                        .filter(
                          (city) =>
                            !selectedState ||
                            data.find(
                              (item) =>
                                item.city === city &&
                                item.state === selectedState
                            )
                        )
                        .map((city) => (
                          <Select.Option key={city} value={city}>
                            {city}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row>
              <Col lg={12}>
                  <Form.Item label="Institute" name="institute">
                    <Select
                      placeholder="Select Institute"
                      onChange={handleInstituteChange}
                      value={selectedInstitute}
                      // disabled={!selectedBranch}
                    >
                      {uniqueInstitutes
                        .filter(
                          (institute) =>
                            !selectedBranch ||
                            data.find(
                              (item) =>
                                item.institute === institute &&
                                item.branch === selectedBranch
                            )
                        )
                        .map((institute) => (
                          <Select.Option key={institute} value={institute}>
                            {institute}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <Form.Item label="Branch" name="branch">
                    <Select
                      placeholder="Select Branch"
                      onChange={handleBranchChange}
                      value={selectedBranch}
                      // disabled={!selectedCity}
                    >
                      {uniqueBranches
                        .filter(
                          (branch) =>
                            !selectedCity ||
                            data.find(
                              (item) =>
                                item.branch === branch &&
                                item.city === selectedCity
                            )
                        )
                        .map((branch) => (
                          <Select.Option key={branch} value={branch}>
                            {branch}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col lg={12}>
                  <Form.Item label="Pincode" name="pincode">
                    <Select
                      placeholder="Select Pincode"
                      onChange={handlePincodeChange}
                      value={selectedPincode}
                      // disabled={!selectedInstitute}
                    >
                      {uniquePincodes
                        .filter((pincode) =>
                          data.some(
                            (item) =>
                              item.pincode === pincode &&
                              item.institute === selectedInstitute
                          )
                        )
                        .map((pincode) => (
                          <Select.Option key={pincode} value={pincode}>
                            {pincode}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          size="middle"
          pagination={false}
        />
      </div>
      <Flex gap="middle" align="start" vertical>
      <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
      <Card
        loading={loading}
        actions={actions}
        style={{
          minWidth: 300,
        }}
      >
        <Card.Meta
          title="Card title"
          description={
            <>
              <p>Meta Card</p>
            </>
          }
        />
      </Card>
    </Flex>
    </div>
  );
}
