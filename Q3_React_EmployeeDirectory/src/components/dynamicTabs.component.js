import React from 'react';
import { Tabs, Tab, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

const DynamicTabs = ({ tabs = [], defaultKey = '', onSelect = () => {} }) => {
  return (
    <Tabs
      defaultActiveKey={defaultKey || (tabs.length > 0 ? tabs[0].eventKey : '')}
      onSelect={onSelect}
      className="mb-3"
      fill
    >
      {tabs.map((tab, idx) => {
        const tabTitle = (
          <>
            {tab.icon && <span className="me-1">{tab.icon}</span>}
            {tab.title}
            {tab.tooltip && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${tab.eventKey}`}>{tab.tooltip}</Tooltip>}
              >
                <InfoCircle className="ms-2 text-muted" />
              </OverlayTrigger>
            )}
          </>
        );

        return (
          <Tab
            key={tab.eventKey}
            eventKey={tab.eventKey}
            title={tabTitle}
            disabled={tab.disabled || false}
          >
            {tab.content}
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default DynamicTabs;