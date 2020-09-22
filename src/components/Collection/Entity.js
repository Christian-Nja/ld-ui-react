import React from 'react';

import CONFIG from './config';

const NO_MESSAGE = '';

export default function Entity(props) {
    return (
        <article className={'entity-container'}>
            <div className={'entity-content'}>
                {props.entity.depiction ? (
                    <figure>
                        <img
                            src={props.entity.depiction}
                            className="entity-image"
                        ></img>
                    </figure>
                ) : (
                    <CONFIG.ITEM_ICON
                        message={NO_MESSAGE}
                        iconClassName={'collectionIcon'}
                        descriptionClassName={'descriptionIcon'}
                    ></CONFIG.ITEM_ICON>
                )}
                <div>{props.entity.entityLabel}</div>
            </div>
        </article>
    );
}
