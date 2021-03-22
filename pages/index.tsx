import React, {Component} from 'react';

import Layout from '../components/layout';
import Adventures from "../components/adventures";
import {Adventure} from "../server/models/adventure";

const adventuresInPage = 5;

interface IIndexPageState {
    adventures: Adventure[];
    loading: boolean;
    page: number;
    error: boolean;

    ruNameTag?: string;
}

interface IIndexPageProps {
    hashTag?: string;
}

interface IIndexInitialProps {
    req: {params: {hashTag: string}};
    query: {hashTag: string};
}

export default class IndexPage extends Component<IIndexPageProps, IIndexPageState> {
    static getInitialProps({req, query}: IIndexInitialProps) {
        const hashTag = req ?
            req.params.hashTag :
            query.hashTag;
        const page = 0;

        return {hashTag, page};
    }
    state: IIndexPageState = {
        loading: true,
        page: 0,
        adventures: [],
        error: false
    };

    handleScroll = ({isIntersecting}: {isIntersecting: boolean}) => {
        if (isIntersecting) {
            this.setState({page: this.state.page + 1});
            this.fetchNextFiveAdventure();
        }
    };

    componentDidMount() {
        this.fetchAdventure();
    }

    componentDidUpdate(prevProps: IIndexPageProps) {
        if (prevProps.hashTag !== this.props.hashTag) {
            this.fetchAdventure();
        }
    }

    fetchAdventure = () => {
        const href = this.props.hashTag ? `api/adventuresByTag?hashTag=${this.props.hashTag}` : 'api/fiveAdventures';
        fetch(href)
            .then(response => {
                if (!response.ok) {
                    throw Error(`${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    if (data.adventures) {
                        const newData = [];
                        newData.push(...data.adventures);
                        this.setState({loading: false, page: 0, adventures: newData, ruNameTag: data.hashTag})
                    }
                }
            })
            .catch(() => this.setState({loading:false, error: true}))
    };

    fetchNextFiveAdventure = () => {
        const href = this.props.hashTag ? `api/getAdventures?offset=${this.state.page*adventuresInPage}&hashTag=${this.props.hashTag}` :
            `api/getAdventures?offset=${this.state.page*adventuresInPage}`;
        fetch(href)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    if (data.adventures) {
                        this.state.adventures.push(...data.adventures);
                        this.setState({loading: false})
                    }
                }
            });
    };

    render() {
        const {adventures, loading, ruNameTag, error} = this.state;
        if (loading) {
            return null;
        }
        if (!adventures.length || error) {
            return <p className="error">Приключения не найдены :(</p>;
        }

        const adventuresComps = adventures.map((el, index) => (
            <Adventures adventure={el} isObserved={index === adventures.length - 1} onIntersection={this.handleScroll} key={el.enName}/>
        ));

        return (
            <Layout>
                {this.props.hashTag ? <div className="hashTag">#{ruNameTag}</div> : null}
                <ul className="adventureList">
                    {adventuresComps}
                </ul>
            </Layout>
        );
    }
}
