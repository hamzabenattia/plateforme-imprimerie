import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pie } from '@ant-design/plots';
import { listOrders } from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";


const SaleStatistics = (props) => {


const { orders,loading  } = props;
let Paid = 0;
let InPaid = 0;
let Delivered = 0;
let NotDelivered = 0;



if (orders) {
  orders.map((order) =>{
    order.isPaid === true ? (Paid = Paid + 1) : (InPaid = InPaid + 1);
     order.isDelivered === true ? (Delivered = Delivered + 1): (NotDelivered = NotDelivered + 1)
  }
  );
}

  const data = [
    {
      type: 'Payé',
      value: Paid,
    },
    {
      type: 'Impayé',
      value: InPaid,
    },
    {
      type: 'Livré',
      value: Delivered,
    },
    {
      type: 'Non livrés',
      value: NotDelivered,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };





  return (
    <div className="col">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Statistiques de commande</h5>
          {loading ? (
              <Loading /> ):
          <Pie {...config} />
         
        }
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
