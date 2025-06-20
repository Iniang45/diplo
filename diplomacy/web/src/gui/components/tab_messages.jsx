import React from "react";
import { Tabs } from "./tabs";
import { Tab } from "./tab";
import { MessageForm } from "../forms/message_form";
import { MessageView } from "./message_view";
import Scrollchor from "react-scrollchor";

export class tabMessages extends React.Component {
  render() {
    const { engine, role, currentTab, onSendMessage, onChangeTab, onClose } =
      this.props;
    const messageChannels = engine.getMessageChannels(role, true);
    const tabNames = [];
    for (let powerName of Object.keys(engine.powers))
      if (powerName !== role) tabNames.push(powerName);
    tabNames.sort();
    tabNames.push("GLOBAL");
    const titles = tabNames.map((tabName) =>
      tabName === "GLOBAL" ? tabName : tabName.substr(0, 3)
    );
    const highlights = this.props.messageHighlights || {};
    const unreadMarked = new Set();

    return (
      <div className="tab-messages">
        <button className="close-chat" onClick={onClose}>
          Close
        </button>
        <Tabs
          menu={tabNames}
          titles={titles}
          onChange={onChangeTab}
          active={currentTab || tabNames[0]}
          highlights={highlights}
        >
          {tabNames.map((protagonist) => (
            <Tab
              key={protagonist}
              className="game-messages"
              display={currentTab === protagonist}
              id={`panel-current-messages-${protagonist}`}
            >
              {!messageChannels.hasOwnProperty(protagonist) ||
              !messageChannels[protagonist].length ? (
                <div className="no-game-message">
                  No messages
                  {engine.isPlayerGame() ? ` with ${protagonist}` : ""}.
                </div>
              ) : (
                messageChannels[protagonist].map((message, index) => {
                  let id = null;
                  if (!message.read && !unreadMarked.has(protagonist)) {
                    if (engine.isOmniscientGame() || message.sender !== role) {
                      unreadMarked.add(protagonist);
                      id = `${protagonist}-unread`;
                    }
                  }
                  return (
                    <MessageView
                      key={index}
                      phase={engine.phase}
                      owner={role}
                      message={message}
                      read={message.phase !== engine.phase}
                      id={id}
                      onClick={this.props.onClickMessage}
                    />
                  );
                })
              )}
            </Tab>
          ))}
        </Tabs>
        {unreadMarked.has(currentTab) && (
          <Scrollchor
            className="link-unread-message"
            to={`${currentTab}-unread`}
            target={`panel-current-messages-${currentTab}`}
          >
            Go to 1st unread message
          </Scrollchor>
        )}
        {engine.isPlayerGame() && (
          <MessageForm
            sender={role}
            recipient={currentTab}
            onSubmit={(form) => onSendMessage(currentTab, form.message)}
          />
        )}
      </div>
    );
  }
}
