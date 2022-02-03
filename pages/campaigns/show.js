import React from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import ContributeForm from "../../components/ContributeForm";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";

const CampaignShow = (props) => (
    <Layout>
        <h3>Campaign Show</h3>
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>{renderCards(props)}</Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm address={props.address} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Link route={`/campaigns/${props.address}/requests`}>
                        <a>
                            <Button primary>View requests</Button>
                        </a>
                    </Link>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Layout>
);

CampaignShow.getInitialProps = async ({ query }) => {
    const campaign = Campaign(query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        address: query.address,
        minimumContribution: summary["0"],
        balance: summary["1"],
        requestCount: summary["2"],
        approversCount: summary["3"],
        manager: summary["4"],
    };
};

const renderCards = ({
    balance,
    manager,
    minimumContribution,
    requestCount,
    approversCount,
}) => {
    const items = [
        {
            header: manager,
            meta: "Address of Manager",
            description: "The manager created this campaign",
            style: { overflowWrap: "break-word" },
        },
        {
            header: minimumContribution,
            meta: "Minimum contribution (wei)",
            description:
                "You must contribute at least this much wei to become an approver",
        },
        {
            header: requestCount,
            meta: "Number of Requests",
            description:
                "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
        },
        {
            header: approversCount,
            meta: "Number of Approvers",
            description:
                "Number of people who already donated to this campaign.",
        },
        {
            header: web3.utils.fromWei(balance, "ether"),
            meta: "Campaign Balance (ether)",
            description:
                "The balance is how much money this campaign has left to spend.",
        },
    ];

    return <Card.Group items={items} />;
};

export default CampaignShow;
