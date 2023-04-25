import prisma from '../db';
// Get all
export const getUpdates = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true
		}
	});
	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates]
	}, [])
	res.json({data:updates})
};

// Get one
export const getOneUpdate = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id
		}
	});

	res.json({ data: update });
};

// Create a product
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
		where: {
            id: req.body.productId
        }
	})
	if(!product) {
		// does not belong to User
		return res.status(404).json({
			message: 'Product not found'
		});
	}
	const update = await prisma.update.create({
		data: {
			title: req.body.title,
			body: req.body.body,
			product: { connect: {id: product.id} }
		}
	});
	res.json({ data: update });
};

// Update a product
export const updateUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
            updates: true
        }
	}); 
	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates]
	}, []);
	const match = updates.find(update => update.id === req.params.id);
	
	if (!match) {
		res.json({message: "Nope"});
	}

	const updatedUpdate = await prisma.update.update({
		where: {
            id: req.params.id
        },
        data: req.body
	});
	res.json({ data: updatedUpdate });
};

// Delete a product
export const deleteUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
            updates: true
        }
	}); 
	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates]
	}, []);
	const match = updates.find(update => update.id === req.params.id);
	
	if (!match) {
		res.json({message: "Nope"});
	}

	const deleted = await prisma.update.delete({
		where: {
            id: req.params.id
        }
	});

	res.json({ data: deleted });
};