import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = ({ address }) => {
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(address);
        setLoading(true);
        setErrorMessage("");

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, "ether"),
            });
            Router.replaceRoute(`/campaigns/${address}`);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
            setValue("");
        }
    };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button loading={loading} primary>
                Contribute!
            </Button>
        </Form>
    );
};

export default ContributeForm;
