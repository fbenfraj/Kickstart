import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

const RequestNew = ({ address }) => {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(address);
        setLoading(true);
        setErrorMessage("");

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, "ether"),
                    recipient
                )
                .send({
                    from: accounts[0],
                });

            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create a request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button loading={loading} primary>
                    Create!
                </Button>
            </Form>
        </Layout>
    );
};

RequestNew.getInitialProps = async ({ query }) => {
    const address = query.address;

    return { address };
};

export default RequestNew;
